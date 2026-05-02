import { useConnection, EdgeProps, Edge, getBezierPath } from '@xyflow/react';
import './styles.css';

type CustomEdgeData = Edge<{ color?: string; strokeStyle?: 'solid' | 'dashed' }, 'custom'>;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  selected,
  data,
}: EdgeProps<CustomEdgeData>) {
  const { fromHandle } = useConnection();
  const strokeColor = fromHandle?.id ?? '#b1b1b7';

  const [d] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const isDashed = data?.strokeStyle === 'dashed';

  return (
    <>
      <path fill="none" stroke="transparent" strokeWidth={12} d={d} />
      <path
        id={id}
        fill="none"
        stroke={strokeColor}
        strokeWidth={selected ? 2.5 : 1.5}
        strokeDasharray={isDashed ? '6 3' : undefined}
        className={isDashed ? 'marching-ants' : undefined}
        d={d}
        markerEnd={markerEnd}
        style={{
          filter: selected ? `drop-shadow(0 0 4px ${strokeColor})` : undefined,
          transition: 'stroke-width 0.2s ease',
          ...style,
        }}
      />
    </>
  );
}