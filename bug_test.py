def login(username, password):
    if username == "admin" and password == "1234":
        print("Login Successful")
    else
        print("Invalid Credentials")

def issue_book(book_id):
    if book_id > 0:
        print("Book Issued")
    else:
        print("Invalid Book ID")

def main():
    username = input("Enter username: ")
    password = input("Enter password: ")

    login(username, password)

    book_id = int(input("Enter Book ID: "))
    issue_book(book_id)

    print("Process Completed")

main()
