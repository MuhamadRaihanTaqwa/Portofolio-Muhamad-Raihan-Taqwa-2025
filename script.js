// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MODAL FOTO PARKIR
    // ============================================
    const btnParkir = document.getElementById('btnParkir');
    const modalParkir = document.getElementById('modalParkir');
    const closeParkir = document.querySelector('.close-parkir');

    if (btnParkir) {
        btnParkir.addEventListener('click', function(e) {
            e.preventDefault();
            if (modalParkir) {
                modalParkir.style.display = "block";
            }
        });
    }

    if (closeParkir) {
        closeParkir.addEventListener('click', function() {
            modalParkir.style.display = "none";
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target == modalParkir) {
            modalParkir.style.display = "none";
        }
    });

    // ============================================
    // MODAL FOTO LINE FOLLOWER
    // ============================================
    const btnLineFollower = document.getElementById('btnLineFollower');
    const modalLineFollower = document.getElementById('modalLineFollower');
    const closeLineFollower = document.querySelector('.close-linefollower');
    const imgLineFollower = document.getElementById('imgLineFollower');
    const captionLineFollower = document.getElementById('captionLineFollower');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const images = ['lf 1.jpeg', 'lf 2.jpeg'];
    let currentIndex = 0;

    function updateImage() {
        imgLineFollower.src = images[currentIndex];
        captionLineFollower.textContent = `Line Follower Robot - Gambar ${currentIndex + 1}`;
    }

    if (btnLineFollower) {
        btnLineFollower.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = 0;
            updateImage();
            if (modalLineFollower) {
                modalLineFollower.style.display = "block";
            }
        });
    }

    if (closeLineFollower) {
        closeLineFollower.addEventListener('click', function() {
            modalLineFollower.style.display = "none";
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateImage();
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target == modalLineFollower) {
            modalLineFollower.style.display = "none";
        }
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FORMULIR KONTAK (Formspree - Otomatis mengirim ke Gmail)
    // ============================================
    // Form ini menggunakan action Formspree, langsung submit tanpa JS

    // ============================================
    // DISKUSI & KOMENTAR (Firebase Firestore - Real-time & Permanent)
    // ============================================
    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');

    // Wait for Firebase to load
    let db = null;
    const checkFirebase = setInterval(() => {
        if (window.db) {
            db = window.db;
            clearInterval(checkFirebase);
            initializeComments();
        }
    }, 100);

    function initializeComments() {
        // Import Firebase functions (assuming they are available globally or via window)
        const { collection, addDoc, onSnapshot, orderBy, query } = window.firebaseFirestore || {
            collection: (db, name) => db.collection(name),
            addDoc: (col, data) => col.add(data),
            onSnapshot: (q, callback) => q.onSnapshot(callback),
            orderBy: (field, direction) => ({ field, direction }),
            query: (col, ...args) => col.orderBy('timestamp', 'desc')
        };

        if (!db) {
            console.error('Firebase not initialized');
            return;
        }

        const commentsRef = collection(db, 'comments');

        // Real-time listener for comments
        const q = query(commentsRef, orderBy('timestamp', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            renderComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Handle form submission
        if (commentForm) {
            commentForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const nameInput = document.getElementById('commentName');
                const messageInput = document.getElementById('commentMessage');

                const newComment = {
                    name: nameInput.value.trim(),
                    message: messageInput.value.trim(),
                    timestamp: new Date()
                };

                if (!newComment.name || !newComment.message) {
                    alert('Silakan isi nama dan pesan.');
                    return;
                }

                try {
                    await addDoc(commentsRef, newComment);
                    alert("Komentar Anda telah ditambahkan!");
                    commentForm.reset();
                } catch (error) {
                    console.error('Error adding comment:', error);
                    alert('Terjadi kesalahan saat menambahkan komentar. Silakan coba lagi.');
                }
            });
        }
    }

    function renderComments(comments) {
        commentsList.innerHTML = '';

        comments.forEach(comment => {
            const commentCard = document.createElement('div');
            commentCard.className = 'comment-card reveal fade-bottom';

            let dateText = "Baru saja";
            if (comment.timestamp) {
                const now = new Date();
                const then = comment.timestamp.toDate ? comment.timestamp.toDate() : new Date(comment.timestamp);
                const diffMinutes = Math.floor((now - then) / (1000 * 60));

                if (diffMinutes < 1) {
                    dateText = "Baru saja";
                } else if (diffMinutes < 60) {
                    dateText = `${diffMinutes} menit yang lalu`;
                } else if (diffMinutes < 1440) {
                    dateText = `${Math.floor(diffMinutes / 60)} jam yang lalu`;
                } else {
                    dateText = then.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                }
            }

            commentCard.innerHTML = `
                <div class="comment-avatar"><i class="fas fa-user"></i></div>
                <div class="comment-body">
                    <h4>${comment.name}</h4>
                    <p>${comment.message}</p>
                    <span class="comment-date">${dateText}</span>
                </div>
            `;
            commentsList.appendChild(commentCard);
        });
    }
});
