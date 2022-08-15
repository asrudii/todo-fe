import Image from 'next/image';
import Link from 'next/link';

export default function ActivityCard({ onDelete, data }) {
  const rendDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fullDate = new Date(data.created_at);
    let localDate = fullDate.toLocaleDateString('id-ID', options);
    return localDate;
  };

  return (
    <div className="card-box" data-cy="activity-item-0">
      <Link href={`/list-activity/${data.id}`}>
        <h3 data-cy="activity-item-title">{data.title}</h3>
      </Link>
      <div className="bottom-inf">
        <span data-cy="activity-item-date">{rendDate()}</span>
        <button data-cy="activity-item-delete-button" onClick={onDelete}>
          <Image
            src="/icon/delete.svg"
            width={24}
            height={24}
            alt="delete-btn"
          />
        </button>
      </div>
    </div>
  );
}
