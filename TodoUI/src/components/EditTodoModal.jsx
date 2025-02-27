// components/EditTodoModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem
} from '@mui/material';

function EditTodoModal({ open, todo, categories, onClose, onSave }) {
  // Local state to hold edited values
  const [editedTodo, setEditedTodo] = useState(todo);

  // When todo prop changes (i.e., a new todo is selected for editing), update local state.
  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  if (!editedTodo) return null;

  const handleChange = (field) => (event) => {
    setEditedTodo({
      ...editedTodo,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedTodo);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          fullWidth
          value={editedTodo.description}
          onChange={handleChange('description')}
        />
        <TextField
          margin="dense"
          label="Priority"
          fullWidth
          type="number"
          value={editedTodo.priority}
          onChange={handleChange('priority')}
        />
        <TextField
          select
          margin="dense"
          label="Category"
          fullWidth
          value={editedTodo.categoryId || ''}
          onChange={handleChange('categoryId')}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTodoModal;