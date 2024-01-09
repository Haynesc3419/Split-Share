package com.backend.controllers.workout;

import com.backend.models.Workout;
import com.backend.repositories.user.UserRepository;
import com.backend.repositories.workout.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WorkoutController {

    @Autowired
    WorkoutRepository workoutRepository;

    @Autowired
    UserRepository userRepository;

    @PutMapping("api/workout/save/{userId}")
    void saveExercise(@BindParam Workout workout, @PathVariable String userId) {
        String workoutId = workoutRepository.save(workout).getId();
        userRepository.saveWorkoutToUser(userId, workoutId);
    }

    @PutMapping("api/workout/edit")
    void editWorkout(@BindParam Workout workout) {
        workoutRepository.save(workout);
    }

    @PutMapping("api/workout/remove/{workoutId}/{userId}")
    void removeWorkoutFromUser(@PathVariable String workoutId, @PathVariable String userId) {
        userRepository.removeWorkoutFromUser(userId, workoutId);
    }

    @GetMapping("api/workout/{workoutId}")
    Workout getWorkoutFromId(@PathVariable String workoutId) {
        return workoutRepository.findWorkoutById(workoutId);
    }
}
