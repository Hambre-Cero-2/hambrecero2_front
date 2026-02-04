package com.example.recipeapp.controller;

import com.example.recipeapp.dto.IngredientInDto;
import com.example.recipeapp.dto.IngredientOutDto;
import com.example.recipeapp.service.IngredientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/ingredients")
    public IngredientOutDto createIngredient(@Valid @RequestBody IngredientInDto inDto) {
        return ingredientService.create(inDto);
    }

    @GetMapping("/ingredients")
    public List<IngredientOutDto> getAllIngredients() {
        return ingredientService.findAll();
    }
    @GetMapping("/ingredients/{id}")
    public IngredientOutDto getIngredient(@PathVariable Long id) {
    return ingredientService.findById(id);
    }
}
