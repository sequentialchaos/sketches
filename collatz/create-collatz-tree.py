# def collatz_tree(num_levels, n=1, tree={}, current_tree={}):
#   if num_levels > 0:
#     return tree

#   current_tree = {}
#   current_tree[n] = {}
#   current_tree[2*n] = {}
#   if (n - 1) % 3 == 0:
#     value = (n - 1) / 3
#     current_tree[n] = {value:{}}
#   return collatz(num_levels-1, 2*n, tree, current_tree)
#   return collatz(num_levels-1, value, tree, current_tree)
#     current_tree[value] = {}
#   tree[n] = current_tree

def collatz_levels(num_levels, level_number=0, levels=[[1]], alt_levels=[[-1]]):
  if num_levels <= 0:
    return levels, alt_levels
    # return levels
  level = []
  alt_level = []
  for value in levels[level_number]:
    level.append(2 * value)
    alt_level.append(0)
    if (value - 1) % 3 == 0 and value > 4: 
      level.append(((value - 1) // 3)) 
      alt_level.append(1)
  levels.append(level)
  alt_levels.append(alt_level)
  return collatz_levels(num_levels-1, level_number+1, levels, alt_levels)

levels, alt_levels = collatz_levels(20)
for i, level in enumerate(levels):
  print(''.join([str(n) for n in alt_levels[i]]), ','.join([str(n) for n in level]))
  # a, b = level.count(0), level.count(1)
  # print(a, b, a/ (b+1), a+b)
  # # print()
  # if i > 0:
    # print(len(level), len(level) - len(levels[i-1]))
# tree = {
#   1 : {
#     2 : {
#       4 : {
#         8 : {
#           16 : {
#             5 : {
#               10 : {
#                 3 : {
#                   6 : {
#                     12 : {
#                       24 : {
#                         48 : {
#                           96 : {
#                             192 : {

#                             }
#                           }
#                         }
#                       }
#                     }
#                   }
#                 }
#               }
#             }
#           }
#         }
#       }
#     }
#   }
# }