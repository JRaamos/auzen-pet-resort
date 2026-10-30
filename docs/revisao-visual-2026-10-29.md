# Revisão de imagens e textos — 29/10/2026

Revisão solicitada pelo usuário para melhorar coerência, alinhamento e apresentação, corrigir a anatomia da foto do hotel e retirar as legendas técnicas de geração das páginas públicas. A hero e as tabelas comerciais foram preservadas.

Foram inspecionadas as 16 fotos de 900 px disponíveis, além dos usos nas páginas, da foto de família e da campanha. Mantidas as fotografias da família e do espaço. A revisão priorizou três imagens: hotel, creche e retrato escuro da galeria. Arquivos anteriores permanecem disponíveis; os novos usam nomes versionados. As três edições usaram a ferramenta integrada de imagens; os derivados web foram redimensionados e codificados em AVIF/JPEG, sem alterações semânticas adicionais.

A foto do hotel agora usa uma única cauda contínua e membros separados. A foto da creche mostra os dois cães no jardim, com enquadramento mais próximo e movimento. O retrato marrom recebe melhor luz e destaque do animal. As legendas de geração foram retiradas conforme pedido; a proveniência fica nesta documentação interna.

Textos e recortes: chamada dos diferenciais mais curta e alinhada à foto; descrição do espaço mais direta; perguntas frequentes com introdução útil; orientação da primeira visita inclui hotel e creche; fotos dos guias e orientações usam a versão atual do hotel. A galeria mantém os oito lugares, com duas substituições nas imagens mais fracas. Horários, condições, telefone, preços e reserva continuam nas mesmas configurações.

## Arquivos e prompts

### Correção anatômica do hotel

Arquivo: `public/images/hotel-welcome-v2.png`. Derivados no mesmo diretório, com sufixos 480/900 e 1600 quando aplicável.

```text
Edit this exact image locally. Keep the same dog identity, friendly face, collar, warm lighting, green porch wall, mat, stone floor, camera framing and all other details. Fix the anatomy in the lower third: there must be exactly ONE tail, the existing tail emerging from the rump and extending toward the RIGHT EDGE OF THE IMAGE behind the body (the dog's left side). Remove the ambiguous furry tail-like fragment behind the front leg near the lower center/left of the image, between the front paws and rear haunch. Reconstruct that small area as plain cream mat and natural negative space around the legs. Make the two front legs and paws cleanly separated, with normal canine anatomy; the rear legs must fold naturally under a sitting dog with no stray furry extensions or duplicated feet. Do not add any second tail or extra limb. Preserve the genuine existing tail at the right edge. This is a precise anatomical cleanup, not a new scene. No text, no marks.
```

### Creche com mais energia

Arquivo: `public/images/daycare-energy-v1.png`. Derivados no mesmo diretório, com sufixos 480/900 e 1600 quando aplicável.

```text
Edit the supplied photo into a polished but authentic photograph for a dog daycare website. Preserve the identities of the TWO dogs in the input: the medium brown dog with a black muzzle, dark floppy ears and pink collar, and the smaller cream-golden fluffy dog. Preserve the recognizable real modest garden: yellow flowering shrub in a green pot, terracotta wall, green gate and lawn. Bring both dogs closer together into a clearly readable, friendly, energetic moment, gently trotting side by side toward the camera, with happy relaxed expressions. Low dog-eye-level perspective, portrait 4:5 framing, both complete dogs comfortably within the frame, no overlap between their bodies or legs, some lawn around them for responsive cropping. Morning light, natural green grass, realistic fur, clear eyes and balanced exposure. Keep the environment simple and believable. Exactly two dogs with correct canine anatomy: one head, four naturally placed legs and ONE tail per dog. No extra paws, duplicated tail fragments, fused bodies or accessories. No swimming pool, no new buildings, no people, no text, no logos. A warm editorial photo that communicates playful movement and attentive care without looking staged or overly processed.
```

### Retrato do cão marrom

Arquivo: `public/images/brown-dog-v2.png`. Derivados no mesmo diretório, com sufixos 480/900 e 1600 quando aplicável.

```text
Edit this exact dog photograph into a brighter, professionally composed outdoor portrait. Preserve the same medium brown dog, black muzzle and ears, dark saddle shading, long natural tail and pink collar. Preserve the simple real outdoor area with the pale path and grassy edges; do not invent luxury facilities or a different venue. Remove the partial second dog clipped at the far left and distracting loose sticks on the ground. Use a lower dog-eye-level perspective and much closer framing so this dog is the clear subject, centrally placed and taking about half of the picture width. Let him look alert and cheerful with a relaxed slightly open mouth, a natural poised stance, all four paws and ears visible, one complete natural tail. Soft warm morning light, lift the deep shade, truthful fur texture, gentle background separation, modest green garden details at the edges. Landscape 16:9 editorial photograph with useful breathing room, natural color. Exactly one dog, anatomically correct, no duplicate legs, no tail fragments, no text, no watermarks, no newly invented furnishings.
```
