from models.db import Database

db = Database()

def migrate(sql_script):
    try:
        db.execute(sql_script)
        db.commit()
        print("Successful Migrations")
    except Exception as e:
        print(f'Error applying migration: {e}')
    finally:
        db.close()
        
if __name__ == "__main__":

    migration_script_path = "migration_script.sql"

    with open(migration_script_path, "r") as script_file:
        migration_script = script_file.read()

    migrate(migration_script)