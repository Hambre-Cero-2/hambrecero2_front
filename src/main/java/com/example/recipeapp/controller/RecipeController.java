package com.example.recipeapp.controller;

import com.example.recipeapp.dto.RecipeOutDto;
import com.example.recipeapp.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.recipeapp.dto.RecipeInDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.List;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes/{id}")
    public RecipeOutDto getRecipeById(@PathVariable Long id) {
        return recipeService.findById(id);
    }

    @GetMapping("/recipes")
    public List<RecipeOutDto> getAllRecipes() {
        return recipeService.findAll();
    }
    
    @PostMapping("/recipes")
    public RecipeOutDto createRecipe(@Valid @RequestBody RecipeInDto inDto) {
         return recipeService.create(inDto);
    }
   
}
