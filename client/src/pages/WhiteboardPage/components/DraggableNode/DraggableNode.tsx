import React from 'react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useRef, useState } from 'react';
import { useDraggable } from '@neodrag/react';
import "./styles.css";

interface DraggableNodeProps {
    className?: string;
    children: React.ReactNode;
    nodeType: 'input' | 'default' | 'output';
    onDrop: (nodeType: string, position: XYPosition) => void;
}

export default function DraggableNode({ className, children, nodeType, onDrop }: DraggableNodeProps) {
    const draggableRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });

    useDraggable(draggableRef, {
        position: position,
        onDrag: ({ offsetX, offsetY }) => {
            // Calculate position relative to the viewport
            setPosition({
                x: offsetX,
                y: offsetY,
            });
        },
        
        onDragEnd: ({ event }) => {
            setPosition({ x: 0, y: 0 });
            onDrop(nodeType, {
                x: event.clientX,
                y: event.clientY,
            });
        },
    });
    return (
        <div className={`draggable-node ${nodeType}`} ref={draggableRef}>
            {children}
        </div>
    )
}
