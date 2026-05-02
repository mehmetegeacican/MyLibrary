import { useConnection, EdgeProps, Edge, getBezierPath } from '@xyflow/react';
import "./styles.css";

type CustomEdgeData = Edge<{ color?: string }, 'custom'>;

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    style,
    selected
}: EdgeProps<CustomEdgeData>) {
    const { fromHandle } = useConnection();


    const strokeColor = fromHandle?.id ?? '#b1b1b7';

    const [d] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });


    return (
        <g>
            <path
                fill="none"
                stroke="transparent"
                strokeWidth={12}
                d={d}
            />
            <path
                id={id}
                fill="none"
                stroke={strokeColor}
                strokeWidth={selected ? 2.5 : 1.5}
                strokeDasharray="6 3"
                className="marching-ants"
                d={d}
                markerEnd={markerEnd}
                style={{
                    filter: selected ? `drop-shadow(0 0 4px ${strokeColor})` : undefined,
                    transition: 'stroke-width 0.2s ease',
                    ...style,
                }}
            />
        </g>
    );
}