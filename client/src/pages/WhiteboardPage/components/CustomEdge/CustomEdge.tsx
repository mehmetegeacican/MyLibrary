import { useConnection, EdgeProps, Edge, getBezierPath } from '@xyflow/react';
import './styles.css';
import { MIND_MAP_EDGE_STROKE_STYLES } from '../../../../enums/enums';
import { useMemo } from 'react';
import { useMindMap } from '../../../../hooks/mindMapHooks';

type CustomEdgeData = Edge<{ color?: string; strokeStyle?: MIND_MAP_EDGE_STROKE_STYLES }, 'custom'>;

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
 
  const strokeColor = data?.color ?? fromHandle?.id ?? '#b1b1b7';

  const [d] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const customStrokeStyle = useMemo(() => {
   
    switch(data?.strokeStyle){
      case MIND_MAP_EDGE_STROKE_STYLES.DASHED:
        return 'marching-ants';
      case MIND_MAP_EDGE_STROKE_STYLES.SOLID:
        return 'default';
      default:
        return 'default';
    }
  },[data]);
  return (
    <>
      <path fill="none" stroke="transparent" strokeWidth={12} d={d} />
      <path
        id={id}
        fill="none"
        stroke={strokeColor}
        strokeWidth={selected ? 2.5 : 1.5}
        strokeDasharray={customStrokeStyle === 'marching-ants' ? '6 3' : undefined}
        className={customStrokeStyle}
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