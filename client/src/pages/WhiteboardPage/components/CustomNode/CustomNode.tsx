import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './styles.css'

export default function CustomNode({ data, type }: any) {
  return (
    <div className={`${type || 'default'}`}>
      {data.label}
      {/* Optional: add handles for input/output */}
      {type === 'input' && <Handle type="source" position={Position.Bottom} />}
      {type === 'output' && <Handle type="target" position={Position.Top} />}
      {(type === 'default' || type === 'output') && (
        <Handle
          type="target"
          position={Position.Top}
          className="custom-handle"
        />
      )}
      {/* Bottom handle for default/input nodes */}
      {(type === 'default' || type === 'input') && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="custom-handle"
        />
      )}
    </div>
  );
}