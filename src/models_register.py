import time
import tensorflow as tf
import pandas as pd
import scraping
import json
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
from datasets import Dataset, DatasetDict

MODEL_HASH = dict()

sentimental_lables = [
    'anger',
    'disgust',
    'fear',
    'joy',
    'neutral',
    'sadness',
    'surprise'
]

def evaluate_model(chosen_model, input):
  if chosen_model in MODEL_HASH:
    comments = scraping.run(input)
    log_file = open("../log/" + input + ".json", "w")
    counts, log_data_commentaries, log_data_labels = MODEL_HASH[chosen_model](comments)
    log_json = []
    #print(log_data_commentaries)
    #print(log_data_labels)
    log_data = zip(log_data_commentaries, log_data_labels)
    for commentary, label in log_data:
      log_json.append({"commentary": commentary, "label": label})
    json.dump(log_json, log_file)
    log_file.close()
    labels = [str(key) for key in counts.keys()]
    counts = [int(value) for value in counts.values()]
    return json.dumps({"labels": labels, "counts": counts})
  else:
    raise ValueError("Could not fulfill the request: the chosen model is not registered.")

# To add more models, add an entry to the hash.

def model_a(input): # input is the string to call with the evaluation method.
  time.sleep(4)
  return "Working!" # Evaluation method call, usually "predict".

MODEL_HASH["model_a"] = model_a

def get_hugging_face_use_function(model_path, tokenizer_path):
  def use_hugging_face(input):
    reloaded_tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
    reloaded_model = TFAutoModelForSequenceClassification.from_pretrained(model_path)
    df = pd.DataFrame({"text": input})
    df = Dataset.from_pandas(df)
    def tokenize_function(examples):
      return reloaded_tokenizer(examples['text'], padding='max_length', truncation=True, max_length=512)
    tokenized_datasets = df.map(tokenize_function, batched=True)
    tokenized_datasets = tokenized_datasets.remove_columns(['text'])
    tokenized_datasets = tokenized_datasets.with_format('tensorflow')
    input_features = {key: tf.constant(tokenized_datasets[key]) for key in reloaded_tokenizer.model_input_names}
    predictions = reloaded_model.predict(input_features)
    max_indexs = tf.argmax(predictions.logits, axis=1)
    predictions_labeled = [sentimental_lables[index] for index in max_indexs]
    counts = dict()
    for label in sentimental_lables:
      counts[label] = 0

    for prediction in predictions_labeled:
      counts[prediction] += 1
    # The second and third are data for logging.
    return counts, input, predictions_labeled

  return use_hugging_face

MODEL_HASH["roberta-3"] = get_hugging_face_use_function("models/roberta_3_finetuned_model", "models/roberta_3_finetuned_model")