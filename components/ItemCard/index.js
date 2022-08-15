import Badge from '../Badge';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ItemCard({ onDelete, onEdit, onCheck, data }) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(data?.is_active);
  }, []);

  return (
    <div className="item-box">
      <div className="item-content">
        <input
          data-cy="todo-item-checkbox"
          type="checkbox"
          onChange={() => {
            setIsActive(!isActive);
            onCheck(!isActive);
          }}
          checked={!isActive}
        />
        <Badge data-cy="todo-item-priority-indicator" type={data.priority} />
        <span
          data-cy="todo-item-title"
          className="item-content-title"
          style={{
            textDecoration: `${isActive ? 'none' : 'line-through'}`,
            opacity: `${isActive ? '1' : '0.6'}`,
          }}
        >
          {data.title}
        </span>
        <button data-cy="todo-item-edit-button" onClick={onEdit}>
          <Image src="/icon/edit.svg" width={20} height={20} alt="edit-btn" />
        </button>
      </div>
      <button data-cy="todo-item-delete-button" onClick={onDelete}>
        <Image src="/icon/delete.svg" width={20} height={20} alt="delete-btn" />
      </button>
    </div>
  );
}
