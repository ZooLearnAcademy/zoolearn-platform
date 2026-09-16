import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Engagement() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    try {
      const [l, c] = await Promise.all([
        axios.get(`${API}/meerkat/likes`),
        axios.get(`${API}/meerkat/comments`),
      ]);
      setLikes(l.data.count || 0);
      setComments(c.data.comments || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  const onLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes(prev => prev + 1);
    try {
      const r = await axios.post(`${API}/meerkat/likes`);
      setLikes(r.data.count);
      toast({ title: 'Thanks for the love!', description: 'You sent a meerkat a virtual sunbeam ☀️' });
    } catch (e) {
      setLiked(false);
      toast({ title: 'Something went wrong', description: 'Please try again in a moment.' });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({ title: 'Please add your name and a message' });
      return;
    }
    setLoading(true);
    try {
      const r = await axios.post(`${API}/meerkat/comments`, { name: name.trim(), message: message.trim() });
      setComments([r.data, ...comments]);
      setName('');
      setMessage('');
      toast({ title: 'Comment posted!', description: 'Thank you for celebrating World Meerkat Day.' });
    } catch (e) {
      toast({ title: 'Could not post comment' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="engage" className="mk-section mk-band-engage">
      <div className="mk-container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="mk-card p-8">
            <div className="mk-tag mb-4">Show Some Love</div>
            <h3 className="mk-h3" style={{color:'var(--mk-brown)'}}>Send a Sunbeam</h3>
            <p className="mt-3" style={{color:'var(--mk-brown-soft)'}}>One tap = one virtual sun-basking session for the mob. It’s a small thing, but it tracks how many people we’ve reached this July 3rd.</p>
            <button onClick={onLike} disabled={liked}
              className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition"
              style={{background: liked ? 'rgba(185,94,42,0.15)' : 'var(--mk-terracotta)', color: liked ? 'var(--mk-terracotta-dark)' : '#fff'}}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Sunbeam sent!' : 'Send a sunbeam'}
            </button>
            <div className="mt-6">
              <div className="mk-stat-num">{likes.toLocaleString()}</div>
              <div className="mk-stat-label">Sunbeams gathered</div>
            </div>
          </div>

          <div className="md:col-span-2 mk-card p-8">
            <div className="mk-tag mb-4">Join the Conversation</div>
            <h3 className="mk-h3" style={{color:'var(--mk-brown)'}}>Share a Meerkat Memory</h3>
            <form onSubmit={onSubmit} className="mt-5 grid gap-3">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" maxLength={40}
                className="px-4 py-3 rounded-xl outline-none" style={{border:'1px solid rgba(139,69,19,0.2)', background:'#fff'}}/>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="What do you love about meerkats?" maxLength={280} rows={3}
                className="px-4 py-3 rounded-xl outline-none resize-none" style={{border:'1px solid rgba(139,69,19,0.2)', background:'#fff'}}/>
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{color:'var(--mk-muted)'}}>{message.length}/280</div>
                <button type="submit" disabled={loading} className="mk-btn-primary inline-flex items-center gap-2 disabled:opacity-60">
                  <Send size={16}/>{loading ? 'Posting…' : 'Post'}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4" style={{color:'var(--mk-brown)'}}>
                <MessageCircle size={18}/>
                <div className="font-semibold">{comments.length} comment{comments.length===1?'':'s'}</div>
              </div>
              <div className="space-y-4 max-h-96 overflow-auto pr-2">
                {comments.length === 0 && (
                  <p className="text-sm" style={{color:'var(--mk-muted)'}}>Be the first to celebrate World Meerkat Day — leave a message above.</p>
                )}
                {comments.map(c => (
                  <div key={c.id} className="p-4 rounded-xl" style={{background:'rgba(212,160,74,0.10)', border:'1px solid rgba(212,160,74,0.25)'}}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-semibold" style={{color:'var(--mk-brown)'}}>{c.name}</div>
                      <div className="text-xs" style={{color:'var(--mk-muted)'}}>{new Date(c.created_at).toLocaleString()}</div>
                    </div>
                    <p className="mt-2 text-sm" style={{color:'var(--mk-brown-soft)'}}>{c.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
