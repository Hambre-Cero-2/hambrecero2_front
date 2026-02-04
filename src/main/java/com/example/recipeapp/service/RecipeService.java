package com.example.recipeapp.service;

import com.example.recipeapp.domain.Ingredient;
import com.example.recipeapp.domain.Recipe;
import com.example.recipeapp.dto.RecipeInDto;
import com.example.recipeapp.dto.RecipeOutDto;
import com.example.recipeapp.exception.RecipeNotFoundException;
import com.example.recipeapp.repository.IngredientRepository;
import com.example.recipeapp.repository.RecipeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final ModelMapper modelMapper;

    public RecipeService(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.modelMapper = modelMapper;
    }

    public List<RecipeOutDto> findAll() {
        return recipeRepository.findAll()
                .stream()
                .map(r -> modelMapper.map(r, RecipeOutDto.class))
                .toList();
    }

    public RecipeOutDto create(RecipeInDto inDto) {
        Recipe recipe = new Recipe();
        recipe.setName(inDto.name);
        recipe.setDifficulty(inDto.difficulty);
        recipe.setVegetarian(inDto.vegetarian);
        recipe.setEstimatedCost(inDto.estimatedCost);
        recipe.setLastModified(inDto.lastModified);
        recipe.setServings(inDto.servings);

        List<Ingredient> ingredients = ingredientRepository.findAllById(inDto.ingredientIds);

        if (ingredients.size() != inDto.ingredientIds.size()) {
            throw new IllegalArgumentException("Some ingredientIds do not exist");
        }

        recipe.setIngredients(ingredients);
        Recipe saved = recipeRepository.save(recipe);
        return modelMapper.map(saved, RecipeOutDto.class);
    }
    public RecipeOutDto findById(Long id) {
            Recipe recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
            return modelMapper.map(recipe, RecipeOutDto.class);
    }
}
