import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BLOG_DATA } from '../data/blogData';
import styles from './BlogDetailPage.module.css';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const blogData = BLOG_DATA.find(b => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blogData) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Article Not Found</h2>
          <Link to="/">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get 3 recent posts excluding the current one for the sidebar
  const recentPosts = BLOG_DATA.filter(b => b.id !== blogData.id).slice(0, 3);

  return (
    <div className={styles.page} data-testid="blog-detail-page">
      <Navbar />
      
      {/* ─── HERO SECTION ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{blogData.title}</h1>
            <div className={styles.breadcrumbs}>
              <Link to="/">HOME</Link>
              <span>›</span>
              <Link to="/">BLOGS</Link>
              <span>›</span>
              <span className={styles.currentCrumb}>{blogData.title.substring(0, 30)}...</span>
            </div>
          </div>
          {/* Half-cut right image effect */}
          <div className={styles.heroImageWrapper}>
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200" alt="Hero Background" />
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className={styles.mainContent}>
        <div className={styles.innerLayout}>
          
          {/* Left Side: Article Details */}
          <div className={styles.articleSide}>
            
            <div className={styles.featuredImageWrapper}>
              <img src={blogData.image} alt={blogData.title} className={styles.featuredImage} />
            </div>

            <h3 className={styles.articleDate}>{blogData.date}</h3>

            {/* Injected HTML Content */}
            <div 
              className={styles.richTextContent}
              dangerouslySetInnerHTML={{ __html: blogData.content }}
            />

            {/* Share & Author Block */}
            <div className={styles.articleFooter}>
              <div className={styles.shareRow}>
                <strong>Share:</strong>
                <button>FACEBOOK</button>
                <button>TWITTER</button>
                <button>LINKEDIN</button>
              </div>

              <div className={styles.authorBox}>
                <div className={styles.authorLogo}>
                  <span>RAMSAM</span>
                </div>
                <div className={styles.authorInfo}>
                  <h4>ramsamtrends</h4>
                  <p>By thinking on behalf of our clients every day we anticipate what they want, provide what they need & build lasting relationships.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Sidebar (Recent Posts Only) */}
          <div className={styles.sidebar}>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Recent Posts</h3>
              <div className={styles.recentList}>
                {recentPosts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className={styles.recentItem}>
                    <img src={post.image} alt={post.title} className={styles.recentImg} />
                    <div className={styles.recentInfo}>
                      <h4>{post.title}</h4>
                      <span>{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;