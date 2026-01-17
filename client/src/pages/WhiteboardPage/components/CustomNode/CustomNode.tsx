import { Handle, Position } from '@xyflow/react';
import './styles.css'

export default function CustomNode({ data, type }: any) {
  return (
    <div className={`${type || 'default'}`}>
      {data.label}
      {type === 'input' && <Handle type="source" position={Position.Bottom} />}
      {type === 'output' && <Handle type="target" position={Position.Top} />}
      {(type === 'default' || type === 'output') && (
        <Handle
          type="target"
          position={Position.Top}
          className="custom-handle"
        />
      )}
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