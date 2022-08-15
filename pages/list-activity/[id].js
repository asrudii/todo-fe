import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddItem from '../../components/AddItem';
import AlertAct from '../../components/AlertAct';
import Confirmation from '../../components/Confirmation';
import Header from '../../components/Header';
import ItemCard from '../../components/ItemCard';
import Layout from '../../components/Layout';
import { ACTIVITY_URL, TODO_URL } from '../../endpoints';

export default function ListActivity({ activity, todo_items }) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [dataActivity, setDataActivity] = useState(activity);
  const [todoItems, setTodoItems] = useState(todo_items);
  const [priority, setPriority] = useState('');
  const [name, setName] = useState('');
  const [deleteItem, setDeleteItem] = useState();
  const [editItem, setEditItem] = useState();
  const [sort, setSort] = useState('');

  const router = useRouter();

  const onAddItem = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/${TODO_URL}`,
        {
          title: name,
          priority,
          activity_group_id: dataActivity.id,
        }
      );

      setTodoItems([response.data, ...todoItems]);
      setOpenAddItem(false);
    } catch (error) {
      alert('add failed');
      console.log(error);
    }
  };

  const onEditIsActive = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/${TODO_URL}/${data.id}`,
        {
          title: data.name,
          priority: data.priority,
          is_active: !data.is_active,
        }
      );

      let idx = todoItems.findIndex((item) => item.id === data.id);
      let updated = todoItems;
      updated[idx] = response.data;

      setTodoItems(updated);
    } catch (error) {
      alert('edit failed');
      console.log(error);
    }
  };

  const onEditItem = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/${TODO_URL}/${editItem.id}`,
        {
          title: name ? name : editItem.name,
          priority: priority ? priority : editItem.priority,
          is_active: editItem.is_active,
        }
      );

      let idx = todoItems.findIndex((item) => item.id === editItem.id);
      let updated = todoItems;
      updated[idx] = response.data;

      setTodoItems(updated);
      setEditItem('');
      setOpenAddItem(false);
    } catch (error) {
      alert('edit failed');
      console.log(error);
    }
  };

  const onEditAct = async (data) => {
    try {
      const title = data.value;
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/${ACTIVITY_URL}/${dataActivity.id}`,
        {
          title,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      setOpen(false);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/${TODO_URL}/${deleteItem.id}`
      );

      let updated = todoItems.filter((item) => item.id !== deleteItem.id);

      setTodoItems(updated);
      setOpenAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const rendItems = () => {
    let sorted = [...todoItems];
    if (sort === 'latest') {
      sorted.sort((a, b) => {
        return b.id - a.id;
      });
    } else if (sort === 'oldest') {
      sorted.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (sort === 'az') {
      sorted.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sort === 'za') {
      sorted.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (sort === 'unfinish') {
      sorted.sort((a, b) => {
        return b.is_active - a.is_active;
      });
    } else {
      sorted = [...todoItems];
    }

    return sorted.map((item, i) => {
      return (
        <ItemCard
          key={item.id}
          data={item}
          data-cy={`todo-item-${i}`}
          onDelete={() => {
            setOpen(true);
            setDeleteItem(item);
          }}
          onEdit={() => {
            setEditItem(item);
            setOpenAddItem(true);
          }}
          onCheck={() => onEditIsActive(item)}
        />
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>To Do List App - {dataActivity.title}</title>
        <meta name="description" content="Todo list of activity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title={dataActivity.title}
        onAdd={() => setOpenAddItem(true)}
        onEdit={onEditAct}
        onBack={() => router.push('/')}
        onSort={setSort}
        sort={sort}
      />
      <main>
        {todoItems.length ? (
          <div className="items-act-wrap">{rendItems()}</div>
        ) : (
          <div className="empty-act-wrap">
            <button
              data-cy="todo-empty-state"
              onClick={() => setOpenAddItem(true)}
            >
              <Image
                src="/img/todo-empty-state.svg"
                width={541}
                height={413}
                alt="act-empty"
              />
            </button>
          </div>
        )}
      </main>
      <AddItem
        data={editItem}
        open={openAddItem}
        onClose={() => {
          setOpenAddItem(false);
          setEditItem('');
        }}
        setPriority={setPriority}
        setName={setName}
        onAddTodo={onAddItem}
        onEditTodo={onEditItem}
      />
      <Confirmation
        open={open}
        title={deleteItem?.title}
        onClose={() => setOpen(false)}
        onConfirmed={onDelete}
      />
      <AlertAct
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Todo item berhasil dihapus"
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/${ACTIVITY_URL}/${id}`
    );

    return {
      props: {
        activity: response.data,
        todo_items: response.data.todo_items,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
