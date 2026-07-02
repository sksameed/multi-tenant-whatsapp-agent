import { StateGraph, START, END } from "@langchain/langgraph";

import { GraphState } from "./state.js";

import { acknowledgeNode } from "./nodes/acknowledgeNode.js";
import { tenantResolverNode } from "./nodes/tenantResolverNode.js";
import { contextRetrieverNode } from "./nodes/contextRetrieverNode.js";
import { reasoningNode } from "./nodes/reasoningNode.js";
import { dispatcherNode } from "./nodes/dispatcherNode.js";

const workflow = new StateGraph(GraphState);

workflow.addNode("acknowledge", acknowledgeNode);
workflow.addNode("tenantResolver", tenantResolverNode);
workflow.addNode("context", contextRetrieverNode);
workflow.addNode("reasoning", reasoningNode);
workflow.addNode("dispatcher", dispatcherNode);

workflow.addEdge(START, "acknowledge");

workflow.addEdge("acknowledge", "tenantResolver");

workflow.addEdge("tenantResolver", "context");

workflow.addEdge("context", "reasoning");

workflow.addEdge("reasoning", "dispatcher");

workflow.addEdge("dispatcher", END);

export const graph = workflow.compile();