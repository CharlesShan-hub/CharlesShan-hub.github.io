---
title: image-basic
tags:
  - note
date: 2026-10-16
comment: 图像的采样和量化、图像特征（邻域与距离）
---

# Image Basic

---
## Overview

![PKM-NEW/dip/assets/dip-image-drawing|1000](../assets/dip-image-drawing.excalidraw.md)

***
## Basic Concepts
### Image

* 图像就是数组，每个像素点的颜色是响应值。
* skimage 库中的data模块有很多预设的图片：👉 [data](../../../ai/python/library/skimage/data.md)

### Sampling

* 采样：从连续信号到离散信号。
* 通过不同尺寸的灰度图像，展示不同等级的采样对图片的影响：👉 [image-sampling](../details/image-sampling.md)
	![../assets/sampling.png](../assets/basic-sampling.png)

### Quantization

* 量化：用多少比特代表每个像素的颜色。
* 不同量化级别对图片颜色的影响：👉 [image-quantization](../details/image-quantization.md)
	![quantization.png](../assets/basic-quantization.png)

### Neighbor

* 4 邻域(上下左右)
* D 邻域(四个角)
* 8 邻域(4+D)

### Distance

$(x,y)$与$(s,t)$的距离：

*  欧氏距离：$D_e = \sqrt{(x-s)^2+(x-t)^2}$
* $D_4$距离：$D_4 = |x-s|+|y-t|$
* $D_8$距离：$D_8 = \max(|x-s|+|y-t|)$

## Reference

1. 岳亚伟，薛晓琴，等. 数字图像处理与 Python 实现（第2版）[M]. 北京：人民邮电出版社，2024.