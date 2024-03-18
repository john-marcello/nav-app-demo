import json
import psycopg2

def main():
    # Establish a connection to the database
    conn = psycopg2.connect(
        dbname='navapp',
        user='navappuser',
        password='navappuser',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()

    # Drop tables if they exist
    cur.execute("DROP TABLE IF EXISTS attributes, relationships, players CASCADE")

    # Create tables
    cur.execute("""
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            player_id VARCHAR(100) NOT NULL UNIQUE,
            combo BOOLEAN NOT NULL,
            display_name VARCHAR(100) NOT NULL,
            image_url VARCHAR(255),
            league VARCHAR(100) NOT NULL,
            league_id INTEGER NOT NULL,
            market VARCHAR(100),
            name VARCHAR(100) NOT NULL,
            position VARCHAR(10) NOT NULL,
            team VARCHAR(10) NOT NULL,
            team_name VARCHAR(100)
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS relationships (
            id SERIAL PRIMARY KEY,
            player_id VARCHAR(100) NOT NULL,
            league_type VARCHAR(100) NOT NULL,
            league_id INTEGER NOT NULL,
            FOREIGN KEY (player_id) REFERENCES players(player_id)
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS attributes (
            id SERIAL PRIMARY KEY,
            player_id VARCHAR(100) NOT NULL,
            combo BOOLEAN NOT NULL,
            display_name VARCHAR(100) NOT NULL,
            image_url VARCHAR(255),
            league VARCHAR(100) NOT NULL,
            league_id INTEGER NOT NULL,
            market VARCHAR(100),
            name VARCHAR(100) NOT NULL,
            position VARCHAR(10) NOT NULL,
            team VARCHAR(10) NOT NULL,
            team_name VARCHAR(100),
            FOREIGN KEY (player_id) REFERENCES players(player_id)
        )
    """)

    # Commit the transaction
    conn.commit()

    # Load your JSON data
    with open('src/data/data.json') as f:
        data = json.load(f)

    # Iterate through the JSON data and insert into the database
    for player in data['data']:
        player_id = player['id']
        player_type = player['type']
        
        # Extract attributes
        attributes = player['attributes']
        combo = attributes['combo']
        display_name = attributes['display_name']
        image_url = attributes['image_url']
        league = attributes['league']
        league_id = attributes['league_id']
        market = attributes['market']
        name = attributes['name']
        position = attributes['position']
        team = attributes['team']
        team_name = attributes['team_name']
        
        # Insert into players table
        cur.execute("""
            INSERT INTO players (type, player_id, combo, display_name, image_url, league, league_id, market, name, position, team, team_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (player_type, player_id, combo, display_name, image_url, league, league_id, market, name, position, team, team_name))

        # Insert into attributes table
        cur.execute("""
            INSERT INTO attributes (player_id, combo, display_name, image_url, league, league_id, market, name, position, team, team_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (player_id, combo, display_name, image_url, league, league_id, market, name, position, team, team_name))
        
        # Relationships
        relationships = player['relationships']['league']['data']
        cur.execute("""
            INSERT INTO relationships (player_id, league_type, league_id)
            VALUES (%s, %s, %s);
            """, (player_id, relationships['type'], relationships['id']))

    # Commit the transaction
    conn.commit()

    # Close the connection
    cur.close()
    conn.close()
    
    print("Migration completed successfully!")

if __name__ == "__main__":
    main()
