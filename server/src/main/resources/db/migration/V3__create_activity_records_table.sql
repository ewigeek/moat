CREATE TABLE activity_records (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    activity_id UUID NOT NULL REFERENCES activities(id),
    date DATE NOT NULL,
    duration_minutes INTEGER,
    time_of_day VARCHAR(20),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);