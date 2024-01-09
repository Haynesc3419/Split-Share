package com.backend.repositories.user;

import com.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface UserRepository extends MongoRepository<User, Long> {
    @Query("{'id' : ?0}")
    User findUserById(String id);

    @Query("{'username' : ?0}")
    User findUserByUsername(String username);

    @Query(value="{'username' : ?0 }", exists = true)
    boolean existsByUsername(String username);

    @Query("{'username':?0}")
    Set<User> getAll(String username);
    @Transactional
    @Query("{'id' : ?0}")
    @Update("{'$addToSet': {'savedExerciseIds': ?1}}")
    void saveExerciseToUser(String userId, String exerciseId);

    @Transactional
    @Query("{'id' : ?0}")
    @Update("{'$pull': {'savedExerciseIds': ?1}}")
    void removeExerciseFromUser(String userId, String exerciseId);

    @Transactional
    @Query("{'id' : ?0}")
    @Update("{'$addToSet': {'savedWorkoutIds': ?1}}")
    void saveWorkoutToUser(String userId, String workoutId);

    @Transactional
    @Query("{'id' : ?0}")
    @Update("{'$pull': {'savedWorkoutIds': ?1}}")
    void removeWorkoutFromUser(String userId, String workoutId);
}
