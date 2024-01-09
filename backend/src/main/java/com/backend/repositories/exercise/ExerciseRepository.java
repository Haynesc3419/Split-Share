package com.backend.repositories.exercise;

import com.backend.models.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ExerciseRepository extends MongoRepository<Exercise, Long> {
    @Query("{'id' : ?0}")
    Exercise findExerciseById(String id);
}
