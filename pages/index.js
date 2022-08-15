import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import ActivityCard from '../components/ActivityCard';
import AlertAct from '../components/AlertAct';
import Confirmation from '../components/Confirmation';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { ACTIVITY_URL } from '../endpoints';

export default function Home({ activities }) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [dataActivities, setDataActivities] = useState(activities);

  const onDelete = async () => {
    try {
      setOpen(false);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/${ACTIVITY_URL}/${deleteItem.id}`
      );

      let updated = dataActivities.filter((item) => item.id !== deleteItem.id);

      setDataActivities(updated);
      setOpenAlert(true);
    } catch (error) {
      alert('delete failed');
      console.log(error);
    }
  };

  const handAddAct = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/${ACTIVITY_URL}`,
        {
          email: process.env.NEXT_PUBLIC_EMAIL,
          title: 'New Activity',
        }
      );

      console.log(response.data);

      setDataActivities([response.data, ...dataActivities]);
    } catch (error) {
      alert('delete failed');
      console.log(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Front-end React.js case Todo-list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Activity" onAdd={handAddAct} />
      <main>
        {dataActivities.length ? (
          <div className="items-wrap">
            {dataActivities.map((item) => {
              return (
                <ActivityCard
                  key={item.id}
                  data={item}
                  onDelete={() => {
                    setOpen(true);
                    setDeleteItem(item);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty-wrap">
            <button data-cy="activity-empty-state">
              <Image
                src="/img/activity-empty-state.svg"
                width={767}
                height={490}
                alt="empty-todo"
              />
            </button>
          </div>
        )}
      </main>
      <Confirmation
        open={open}
        title={deleteItem?.title}
        onClose={() => setOpen(false)}
        onConfirmed={onDelete}
      />
      <AlertAct
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Activity berhasil dihapus"
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/${ACTIVITY_URL}`,
      {
        params: {
          email: process.env.NEXT_PUBLIC_EMAIL,
        },
      }
    );

    return {
      props: {
        activities: response.data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
