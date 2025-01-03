MODEL_HASH = dict()

def evaluate_model(chosen_model, input):
  if chosen_model in MODEL_HASH:
    return MODEL_HASH[chosen_model](input)
  else:
    raise ValueError("Could not fulfill the request: the chosen model is not registered.")

# To add more models, add an entry to the hash.

def model_a(input): # input is the string to call with the evaluation method.
  return "Working!" # Evaluation method call, usually "predict".

MODEL_HASH["model_a"] = model_a