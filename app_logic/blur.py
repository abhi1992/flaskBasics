from PIL import Image, ImageFilter
import os
import random

def blur(name, i, j, w, h, iterations=10):
    image = Image.open(os.path.join(os.path.dirname(os.path.realpath(__file__))+ name))
    box = (i, j, w, h)

    ic = image.crop(box)
    # ic.show()

    for i in range(iterations):
        ic = ic.filter(ImageFilter.BLUR)
        # ic.show()

    image.paste(ic, box)
    edited_name = name+"_edited_"+str(int(random.uniform(1000000, 1000000000)))+name[name.rindex("."):]
    image.save(edited_name)
    return edited_name
    # image.show()