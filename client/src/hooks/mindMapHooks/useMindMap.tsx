import { applyNodeChanges, applyEdgeChanges, addEdge, Edge } from "@xyflow/react";
import { useCallback, useState } from "react";
import { MIND_MAP_NODE_DATA_ATTRIBUTE } from "../../enums/enums";
import { IMindMapEdge, IMindMapNode } from "../../interfaces/DataInterfaces";

export function useMindMap() {

    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    const [selectedNode, setSelectedNode] = useState<IMindMapNode | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<IMindMapEdge | null>(null);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot: any) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onSelectionChange = useCallback((params: { nodes: any[]; edges: any[] }) => {
        setSelectedNode(params.nodes.length > 0 ? params.nodes[0] : null);
        setSelectedEdge(params.edges.length > 0 ? params.edges[0] : null);
    }, []);

    const updateNodeData = useCallback((nodeId: string, newData: string, updatedDataType: MIND_MAP_NODE_DATA_ATTRIBUTE) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node._id === nodeId) {
                    const result = {
                        ...node,
                        data: {
                            ...node?.data,
                            [updatedDataType]: newData
                        }
                    };
                    setSelectedNode(result);
                    return result;
                }
                return node;
            })
        );
    }, [setNodes]);


    const formatNodesFromApiForState = (fetchedNodes: IMindMapNode[]) => {
        return fetchedNodes?.map((node: IMindMapNode) => ({
            ...node,
            id: node._id
        })) ?? [];
    }

    const formatNodesFromStateForApi = (nodesFromState: Node[]) => {
        const updatedNodes = nodesFromState.map((node: any) => {
            return {
                type: node?.type,
                position: node?.position,
                data: node?.data,
                _id:node?._id
            }
        })
        return updatedNodes;
    }

    const formatEdgesFromStateForApi = (edgesFromState: Edge[]) => {
        const updatedEdges = edgesFromState.map((edge: any) => {
            return {
                source: edge?.source,
                target: edge?.target,
            }
        })
        return updatedEdges;
    }

    const formatEdgesFromApiForState = (fetchedEdges: IMindMapEdge[]) => {
        return fetchedEdges?.map((edge: IMindMapEdge) => ({
            ...edge,
            id: edge._id
        })) ?? [];
    }


    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedNode,
        selectedEdge,
        setSelectedNode,
        setSelectedEdge,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onSelectionChange,
        updateNodeData,
        formatNodesFromApiForState,
        formatNodesFromStateForApi,
        formatEdgesFromStateForApi,
        formatEdgesFromApiForState
    }
}