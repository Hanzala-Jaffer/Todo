// components/Categories.js
import React, {useState, useEffect} from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getCategories } from '../api/todoService';

function Categories({ categories, selectedCategory, onCategorySelect }) {
    

    return (
        <List>
            {categories.map(category => (
                <ListItem
                    button
                    key={category.id}
                    onClick={() => onCategorySelect(category)}
                    sx={{
                        backgroundColor: selectedCategory && selectedCategory.id === category.id ? 'grey.300' : 'inherit',
                        '&:hover': {
                          backgroundColor: 'grey.200',
                        },
                      }}
                >
                    <ListItemText primary={category.name} />
                </ListItem>
            ))}
        </List>
    );
}

export default Categories;