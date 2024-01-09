package com.backend.repositories.workout;

import com.backend.models.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface WorkoutRepository extends MongoRepository<Workout, Long> {
    @Query("{'id' : ?0}")
    Workout findWorkoutById(String id);
}
