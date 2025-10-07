from config import db
from bson import ObjectId

def insert_transaction(data):
    result = db.transactions.insert_one(data)
    # Return the inserted document with _id as string
    data["_id"] = str(result.inserted_id)
    return data

def get_transactions():
    transactions = list(db.transactions.find({}))
    # Convert ObjectId to string for all documents
    for t in transactions:
        t["_id"] = str(t["_id"])
    return transactions

def delete_transaction(transaction_id):
    try:
        result = db.transactions.delete_one({"_id": ObjectId(transaction_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error deleting transaction: {e}")
        return False
