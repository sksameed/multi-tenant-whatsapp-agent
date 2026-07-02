import { StateGraph, START, END } from "@langchain/langgraph";

import { GraphState } from "./state.js";

import { acknowledgeNode } from "./nodes/acknowledgeNode.js";
import { contextRetrieverNode } from "./nodes/contextRetrieverNode.js";
import { reasoningNode } from "./nodes/reasoningNode.js";
import { dispatcherNode } from "./nodes/dispatcherNode.js";

const workflow = new StateGraph(GraphState);

workflow.addNode("acknowledge", acknowledgeNode);

workflow.addNode("context", contextRetrieverNode);

workflow.addNode("reasoning", reasoningNode);

workflow.addNode("dispatcher", dispatcherNode);

workflow.addEdge(START, "acknowledge");

workflow.addEdge("acknowledge", "context");

workflow.addEdge("context", "reasoning");

workflow.addEdge("reasoning", "dispatcher");

workflow.addEdge("dispatcher", END);

export const graph = workflow.compile();