# from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# def sumarizare_text(text):
#     model_name = "google/pegasus-large"
#     tokenizer = PegasusTokenizer.from_pretrained(model_name)
#     model = PegasusForConditionalGeneration.from_pretrained(model_name)

#     input_text = text

#     input_ids = tokenizer(input_text, return_tensors="pt").input_ids
#     summary_ids = model.generate(input_ids)
#     summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
#     return summary_text



# ALT MOD: bazat pe similaritatea semantică între propoziții și pe importanța lor relativă pentru a genera un rezumat.
'''
 Această funcție folosește o abordare mai tradițională, bazată pe prelucrarea limbajului natural (NLP). 
 Folosește similaritatea cosinusului între propoziții pentru a construi o matrice de similaritate între propoziții, 
 apoi utilizează algoritmul PageRank pentru a clasifica propozițiile în funcție de importanța lor și pentru a selecta cele
   mai semnificative propoziții pentru a forma rezumatul.
'''

from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
import nltk
import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
nltk.download('stopwords')

def sumarizare_text(text):
    stop_words = stopwords.words('english')
    summarize_text = []
    sentences =  read_article(text)
    # print(sentences)

    # Step 2 - Generate Similary Martix across sentences
    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

    # Step 3 - Rank sentences in similarity martix
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph)

    # Step 4 - Sort the rank and pick top sentences
    ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)    
    #print("Indexes of top ranked_sentence order are ", ranked_sentence)

    # for i in range(top_n):
    #     #summarize_text.append(" ".join(ranked_sentence[i][1]))
    summarize_text.append(" ".join(ranked_sentence[0][1]))
    summary_string = " ".join(summarize_text)
    return summary_string


def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []
 
    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]
 
    all_words = list(set(sent1 + sent2))
 
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
 
    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1
 
    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1

    return 1 - cosine_distance(vector1, vector2)

def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
 
    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2: #ignore if both are same sentences
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)
            
    return similarity_matrix

def read_article(text):
    filedata = text.replace("\n", "")
    article = filedata.split(". ")
    sentences = []
    print('ORIGINAL TEXT:\n')
    for sentence in article:
        print(sentence)
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))  
        
    return sentences
