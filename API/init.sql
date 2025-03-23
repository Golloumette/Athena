CREATE TABLE conversation (
  id_conversation SERIAL PRIMARY KEY,
  titre TEXT,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE response (
  id SERIAL PRIMARY KEY,
  text_response TEXT NOT NULL
);

CREATE TABLE requetes (
  id_requete SERIAL PRIMARY KEY,
  id_conversation INTEGER REFERENCES conversation(id_conversation),
  id_response INTEGER REFERENCES response(id),
  text_requete TEXT NOT NULL,
  date_requete TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
