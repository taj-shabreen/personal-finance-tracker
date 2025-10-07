def success_response(data, message="success"):
    return {"message": message, "data": data}, 200

def error_response(message, code=400):
    return {"error": message}, code
