package com.backend.controllers.exercise;

import com.backend.models.Exercise;
import com.backend.repositories.exercise.ExerciseRepository;
import com.backend.repositories.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ExerciseController {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    UserRepository userRepository;

    @PutMapping("api/exercise/save/{userId}")
    void saveExercise(@BindParam Exercise exercise, @PathVariable String userId) {
        String exerciseId = exerciseRepository.save(exercise).getId();
        userRepository.saveExerciseToUser(userId, exerciseId);
    }

    @PutMapping("api/exercise/edit")
    void editExercise(@BindParam Exercise exercise) {
        exerciseRepository.save(exercise);
    }

    @PutMapping("api/exercise/remove/{exerciseId}/{userId}")
    void removeExerciseFromUser(@PathVariable String exerciseId, @PathVariable String userId) {
        userRepository.removeExerciseFromUser(userId, exerciseId);
    }

    @GetMapping("api/exercise/{exerciseId}")
    Exercise getExerciseFromId(@PathVariable String exerciseId) {
        return exerciseRepository.findExerciseById(exerciseId);
    }
}
