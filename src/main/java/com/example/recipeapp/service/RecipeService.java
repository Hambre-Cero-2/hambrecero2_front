package com.example.recipeapp.service;

import com.example.recipeapp.dto.RecipeOutDto;
import com.example.recipeapp.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
    }

    public List<RecipeOutDto> findAll() {
        return recipeRepository.findAll()
                .stream()
                .map(r -> modelMapper.map(r, RecipeOutDto.class))
                .toList();
    }
}
