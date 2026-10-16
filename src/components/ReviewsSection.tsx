import React, { useState } from 'react';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquarePlus, Send, X } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [gameTitle, setGameTitle] = useState('Black Myth: Wukong');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      gameTitle,
      rating,
      date: 'Сегодня',
      text: reviewText.trim(),
      verifiedPurchase: true
    };

    onAddReview(newRev);
    setShowAddModal(false);
    setAuthorName('');
    setReviewText('');
  };

  return (
    <section id="reviews" className="py-20 border-b border-neutral-850 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <span>Реальный опыт</span>
              <span aria-hidden="true">·</span>
              <span>Проверенные покупатели</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Отзывы наших игроков
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Средняя оценка сервиса 4.96 из 5 на основе более 1 400 успешных активаций
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-auto px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Оставить отзыв</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400' : 'text-neutral-700'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">{rev.date}</span>
                </div>

                <div className="text-xs text-amber-400/90 font-medium">
                  {rev.gameTitle}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-850/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{rev.author}</span>
                {rev.verifiedPurchase && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Проверенная покупка</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div 
            className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100 space-y-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white">Оставить отзыв о покупке</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-400 font-medium">Ваше имя или никнейм:</label>
                <input
                  type="text"
                  required
                  placeholder="Иван М."
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-medium">Какую игру вы приобрели:</label>
                <input
                  type="text"
                  required
                  value={gameTitle}
                  onChange={e => setGameTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-medium">Ваша оценка:</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        rating === num
                          ? 'bg-amber-400 text-neutral-950 border-amber-400'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {num} ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-medium">Текст отзыва:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Напишите пару слов о скорости выдачи, установке игры и впечатлениях..."
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Опубликовать отзыв</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
