from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import errors
from bson import ObjectId
from datetime import datetime, timedelta
from typing import Optional
from database import db_instance
from config import ANALYTICS_PORT
import uvicorn

app = FastAPI(title="QuickTask Analytics Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "QuickTask Analytics Service is running", "status": "OK"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "analytics"}

# @route   GET /user-stats/{userId}
# @desc    Returns total tasks, completion percentage, and distribution by priority
# @access  Public (should add auth in production)
@app.get("/user-stats/{userId}")
async def get_user_stats(userId: str):
    try:
        db = db_instance.get_db()
        tasks_collection = db.tasks
        
        # Validate ObjectId
        if not ObjectId.is_valid(userId):
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        
        user_object_id = ObjectId(userId)
        
        # Get all tasks for the user
        tasks = list(tasks_collection.find({"userId": user_object_id}))
        
        if not tasks:
            return {
                "userId": userId,
                "totalTasks": 0,
                "completionPercentage": 0,
                "priorityDistribution": {
                    "Low": 0,
                    "Med": 0,
                    "High": 0
                },
                "statusDistribution": {
                    "Todo": 0,
                    "In Progress": 0,
                    "Completed": 0
                }
            }
        
        total_tasks = len(tasks)
        completed_tasks = sum(1 for task in tasks if task.get("status") == "Completed")
        completion_percentage = round((completed_tasks / total_tasks) * 100, 2) if total_tasks > 0 else 0
        
        # Priority distribution
        priority_dist = {"Low": 0, "Med": 0, "High": 0}
        for task in tasks:
            priority = task.get("priority", "Med")
            if priority in priority_dist:
                priority_dist[priority] += 1
        
        # Status distribution
        status_dist = {"Todo": 0, "In Progress": 0, "Completed": 0}
        for task in tasks:
            status = task.get("status", "Todo")
            if status in status_dist:
                status_dist[status] += 1
        
        return {
            "userId": userId,
            "totalTasks": total_tasks,
            "completedTasks": completed_tasks,
            "completionPercentage": completion_percentage,
            "priorityDistribution": priority_dist,
            "statusDistribution": status_dist
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user stats: {str(e)}")

# @route   GET /productivity-analysis/{userId}
# @desc    Analyzes task completion trends over time (group by day/week)
# @access  Public (should add auth in production)
@app.get("/productivity-analysis/{userId}")
async def get_productivity_analysis(userId: str, groupBy: Optional[str] = "day"):
    try:
        db = db_instance.get_db()
        tasks_collection = db.tasks
        
        # Validate ObjectId
        if not ObjectId.is_valid(userId):
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        
        if groupBy not in ["day", "week"]:
            raise HTTPException(status_code=400, detail="groupBy must be 'day' or 'week'")
        
        user_object_id = ObjectId(userId)
        
        # Get all tasks for the user
        tasks = list(tasks_collection.find({"userId": user_object_id}))
        
        if not tasks:
            return {
                "userId": userId,
                "groupBy": groupBy,
                "trends": [],
                "message": "No tasks found for this user"
            }
        
        # Process tasks by date
        trends = {}
        
        for task in tasks:
            # Use updatedAt or createdAt for completed tasks
            task_date = None
            if task.get("status") == "Completed" and task.get("updatedAt"):
                task_date = task["updatedAt"]
            elif task.get("createdAt"):
                task_date = task["createdAt"]
            
            if not task_date:
                continue
            
            # Convert to datetime if it's not already
            if isinstance(task_date, str):
                try:
                    task_date = datetime.fromisoformat(task_date.replace('Z', '+00:00'))
                except:
                    continue
            elif not isinstance(task_date, datetime):
                # Handle MongoDB date objects (BSON datetime)
                try:
                    task_date = task_date if hasattr(task_date, 'strftime') else datetime.fromtimestamp(task_date)
                except:
                    continue
            
            # Group by day or week
            if groupBy == "day":
                date_key = task_date.strftime("%Y-%m-%d")
            else:  # week
                # Get the start of the week (Monday)
                week_start = task_date - timedelta(days=task_date.weekday())
                date_key = week_start.strftime("%Y-%m-%d")
            
            if date_key not in trends:
                trends[date_key] = {
                    "date": date_key,
                    "totalTasks": 0,
                    "completedTasks": 0,
                    "createdTasks": 0
                }
            
            trends[date_key]["totalTasks"] += 1
            
            if task.get("status") == "Completed":
                trends[date_key]["completedTasks"] += 1
            
            # Count created tasks (using createdAt)
            if task.get("createdAt"):
                created_date = task["createdAt"]
                if isinstance(created_date, str):
                    try:
                        created_date = datetime.fromisoformat(created_date.replace('Z', '+00:00'))
                    except:
                        continue
                elif not isinstance(created_date, datetime):
                    try:
                        created_date = created_date if hasattr(created_date, 'strftime') else datetime.fromtimestamp(created_date)
                    except:
                        continue
                
                if groupBy == "day":
                    created_key = created_date.strftime("%Y-%m-%d")
                else:
                    week_start = created_date - timedelta(days=created_date.weekday())
                    created_key = week_start.strftime("%Y-%m-%d")
                
                if created_key == date_key:
                    trends[date_key]["createdTasks"] += 1
        
        # Convert to sorted list
        trends_list = sorted(trends.values(), key=lambda x: x["date"])
        
        return {
            "userId": userId,
            "groupBy": groupBy,
            "trends": trends_list,
            "totalDataPoints": len(trends_list)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching productivity analysis: {str(e)}")

if __name__ == "__main__":
    print(f"Starting QuickTask Analytics Service on port {ANALYTICS_PORT}...")
    print(f"✓ Health Check: http://localhost:{ANALYTICS_PORT}/health")
    print(f"✓ API Docs: http://localhost:{ANALYTICS_PORT}/docs")
    uvicorn.run(app, host="0.0.0.0", port=ANALYTICS_PORT)
