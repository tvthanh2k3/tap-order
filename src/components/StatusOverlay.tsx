type Props = { status: 'won' | 'lost' };

export default function StatusOverlay({ status }: Props) {
  return (
    <div className={`overlay ${status}`}>
      {status === 'won' ? 'ALL CLEARED' : 'GAME OVER'}
    </div>
  );
}
