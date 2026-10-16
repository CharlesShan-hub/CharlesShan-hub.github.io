---
title: image-quantization
tags:
  - attachment
date: 2026-10-16
comment:
filename: dip-image-quantization.py
---

# Image Quantization

通过调整量化级别，展示了不同量化程度对图像的影响，反映了量化过程中图像细节的损失。

![quantization.png](../assets/basic-quantization.png)

```python
import numpy as np
import matplotlib.pyplot as plt
  
plt.figure(figsize=(8, 3.5))   # 宽一点矮一点，让条带变细
  
def generate_image(level):
    I = np.zeros((16,256))
    for x in range(256):
        n = 2**level         # 一共多少个格子
        length = int(256/n)  # 每个格子有多大
        I[:, x] = int(x/length) / n
    return I/np.max(I)
  
def plot(index,level):
    plt.subplot(4,1,index+1)
    plt.imshow(generate_image(level), cmap='gray', vmax=1, vmin=0, aspect='auto')
    plt.axis('off')
    plt.text(0.5, -0.10, f"({chr(ord('a')+index)}) level={level}  color={2**level}",
             ha='center', va='top', transform=plt.gca().transAxes, color='#4682E3')
for index,level in enumerate([1,2,4,8]):
    plot(index,level)
plt.subplots_adjust(hspace=0.4)   # 条带变细后留缝要放大一点，否则标注文字放不下
plt.savefig('basic-quantization.png', transparent=True, bbox_inches='tight')
plt.show()
```