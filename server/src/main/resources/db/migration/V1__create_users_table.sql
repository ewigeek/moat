CREATE TABLE users (
    id UUID PRIMARY KEY,
    keycloak_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);