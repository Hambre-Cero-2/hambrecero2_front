package com.example.recipeapp.controller;

import com.example.recipeapp.dto.RecipeOutDto;
import com.example.recipeapp.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes")
    public List<RecipeOutDto> getAllRecipes() {
        return recipeService.findAll();
    }
}
