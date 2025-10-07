from flask import Blueprint, request, jsonify
from services.parse_service import parse_file
from models.transaction_model import insert_transaction, get_transactions, delete_transaction

transaction_bp = Blueprint("transactions", __name__)

# GET all transactions
@transaction_bp.route("/", methods=["GET"])
def list_transactions():
    data = get_transactions()
    return jsonify(data)

# POST a new transaction
@transaction_bp.route("/", methods=["POST"])
def add_transaction():
    body = request.json
    if not body:
        return {"error": "Missing JSON body"}, 400
    inserted = insert_transaction(body)
    return jsonify({"message": "Transaction added", "transaction": inserted}), 201

# POST upload file
@transaction_bp.route("/upload", methods=["POST"])
def upload_transactions():
    if "file" not in request.files:
        return {"error": "No file uploaded"}, 400
    file = request.files["file"]
    transactions = parse_file(file)
    # Convert _id to string for uploaded transactions (if inserting here)
    for t in transactions:
        t["_id"] = str(t.get("_id", t.get("id", "")))
    return jsonify({"parsed": transactions})

# DELETE a transaction by ID
@transaction_bp.route("/<transaction_id>", methods=["DELETE"])
def remove_transaction(transaction_id):
    result = delete_transaction(transaction_id)
    if result:
        return jsonify({"message": "Transaction deleted successfully"}), 200
    else:
        return jsonify({"message": "Transaction not found"}), 404
