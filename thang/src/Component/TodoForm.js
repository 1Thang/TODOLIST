import React, { useState, useEffect } from 'react';

const TodoForm = ({ addOrEditTodo, editingTodo }) => {
  const [name, setName] = useState(''); // Tên công việc

  // Cập nhật nội dung input nếu đang trong chế độ sửa
  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Gọi hàm thêm hoặc sửa tùy thuộc vào trạng thái công việc
    addOrEditTodo({ ...editingTodo, name });
    setName(''); // Xóa nội dung sau khi thêm/sửa
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add or Edit a todo"
        style={{ marginRight: '8px' }}
      />
      <button type="submit">{editingTodo ? 'Save' : 'Add'}</button>
    </form>
  );
};

export default TodoForm;
