## TaDELS RAG

The Taiwan Database for Empirical Legal Studies (TaDELS) was established to preserve and provide access to empirical legal data for research, teaching, and policy analysis. Its Legal Document Database contains various types of legal documents, allowing users to examine case facts, applicable laws, judicial reasoning, and legal outcomes.

However, legal documents are often stored in their original textual form, which makes information retrieval and case comparison time-consuming. Users still need to manually read, identify, and organize relevant legal information. This becomes increasingly difficult as the number of documents grows.

To address this issue, this study builds a RAG-based question-answering system for the Legal Document Database. The system first retrieves relevant legal documents or passages and then generates answers grounded in the retrieved content. Because legal answers should remain faithful to the original texts, this study further constructs a legal QA dataset and adopts an entity-based evaluation method to assess whether the generated answers correctly cover key legal facts, legal provisions, and case outcomes.
