import Image from 'next/image';
import { EditText } from 'react-edit-text';
import Button from '../Button';
import SortButton from '../SortButton';

export default function Header({ onAdd, onEdit, onBack, title, onSort, sort }) {
  const editButton = () => {
    return (
      <button data-cy="todo-title-edit-button">
        <Image src="/icon/edit2.svg" width={24} height={24} alt="edit-btn" />
      </button>
    );
  };

  return (
    <section className="header-wrap">
      <div className="content-left-wrap">
        {onEdit ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button data-cy="todo-back-button" onClick={onBack}>
              <Image
                src="/icon/back.svg"
                width={32}
                height={32}
                alt="back-btn"
              />
            </button>
            <EditText
              data-cy="todo-title"
              className="act-title"
              inputClassName="act-title-edit"
              defaultValue={title}
              onSave={onEdit}
              showEditButton
              editButtonContent={editButton()}
            />
          </div>
        ) : (
          <h2 data-cy="activity-title" className="act-title">
            {title}
          </h2>
        )}
      </div>
      <div className="content-right-wrap">
        {onEdit && (
          <SortButton data-cy="todo-sort-button" onSort={onSort} sort={sort} />
        )}
        <Button
          data-cy={onEdit ? 'todo-add-button' : 'activity-add-button'}
          onClick={onAdd}
          addIcon
          title="Tambah"
        />
      </div>
    </section>
  );
}
