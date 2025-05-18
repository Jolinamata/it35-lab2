import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
  IonTextarea,
  IonInput,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { heartOutline, chatboxEllipsesOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';

type Post = {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: string[];
};

const Feed: React.FC = () => {
  const router = useIonRouter();

  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const canPost = role === 'teacher';

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (!role || !username) {
      router.push('/login', 'root');
    }
  }, [role, username]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const defaultPost: Post[] = [
        {
          id: 1,
          author: 'Teacher',
          content: 'This is a post from the teacher.',
          likes: 0,
          comments: [],
        },
      ];
      setPosts(defaultPost);
      localStorage.setItem('posts', JSON.stringify(defaultPost));
    }
  }, []);

  const updatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const handlePost = () => {
    if (newPostContent.trim() === '') return;
    const newPost: Post = {
      id: Date.now(),
      author: username || 'Anonymous',
      content: newPostContent,
      likes: 0,
      comments: [],
    };
    updatePosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId: number) => {
    const updated = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    updatePosts(updated);
  };

  const handleComment = (postId: number) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    const updated = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    updatePosts(updated);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleDelete = (postId: number) => {
    updatePosts(posts.filter((post) => post.id !== postId));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.clear();
      setRole(null);
      setUsername(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Class Wall</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="light">
      
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          background: 'linear-gradient(to bottom right, #d2f0f4, #b2f7d2)',
          minHeight: '100vh',
        }}
      >
        <IonCard style={{ background: 'white', borderRadius: '12px' }}>
          <IonCardContent>
            <IonText>
              <h2>Welcome, {role === 'teacher' ? 'Teacher' : 'Student'}!</h2>
              <p>
                This is the shared class wall.{' '}
                {role === 'teacher'
                  ? 'You can post and delete posts.'
                  : 'You can like and comment on posts.'}
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {canPost && (
          <IonCard style={{ background: '#fff' }}>
            <IonCardHeader>
              <IonCardTitle>Create a Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonTextarea
                placeholder="Write something..."
                value={newPostContent}
                onIonChange={(e) => setNewPostContent(e.detail.value!)}
              />
              <IonButton expand="block" onClick={handlePost} className="ion-margin-top">
                Post
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {posts.map((post) => (
          <IonCard key={post.id} style={{ backgroundColor: '#fefefe' }}>
            <IonCardHeader>
              <IonCardTitle>{post.author}'s Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>{post.content}</IonText>
              <div className="ion-margin-top">
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => handleLike(post.id)}
                >
                  <IonIcon icon={heartOutline} slot="start" />
                  Like ({post.likes})
                </IonButton>

                {canPost && (
                  <IonButton
                    fill="clear"
                    color="medium"
                    onClick={() => handleDelete(post.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    🗑️ Delete
                  </IonButton>
                )}
              </div>

              <IonItem lines="none">
                <IonInput
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ''}
                  onIonChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [post.id]: e.detail.value!,
                    }))
                  }
                />
                <IonButton onClick={() => handleComment(post.id)}>
                  <IonIcon icon={chatboxEllipsesOutline} />
                </IonButton>
              </IonItem>

              {post.comments.length > 0 && (
                <ul>
                  {post.comments.map((c, index) => (
                    <li key={index}>
                      <IonText>
                        <IonLabel>- {c}</IonLabel>
                      </IonText>
                    </li>
                  ))}
                </ul>
              )}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
