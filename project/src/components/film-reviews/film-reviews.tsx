import { Review } from '../../types/types';

const getReview = (review: Review): JSX.Element => (
  <div className="review" key={review.id}>
    <blockquote className="review__quote">
      <p className="review__text">
        {review.comment}
      </p>

      <footer className="review__details">
        <cite className="review__author">{review.user.name}</cite>
        <time className="review__date" dateTime={review.date}>
          {(new Date(review.date)).toLocaleDateString('en-uk')}
        </time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);

type Props = {
  reviews: Review[];
}
export default function FilmReviews({ reviews }: Props): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(reviews.length / 2, reviews.length).map((review) => getReview(review))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2).map((review) => getReview(review))}
      </div>
    </div>
  );
}
